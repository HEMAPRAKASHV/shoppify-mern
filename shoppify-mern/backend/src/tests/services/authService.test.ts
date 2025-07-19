import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/userModel"; 
import { userRegister, userLogin } from "../../service/authService";

jest.mock("../../models/userModel"); // Mocking User model
jest.mock("bcryptjs"); // Mocking bcrypt
jest.mock("jsonwebtoken"); // Mocking JWT

describe("Auth Service", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "testsecret"; // Set the secret key for tests
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe("userRegister", () => {
    it("should register a new user successfully", async () => {
      const mockUser = {
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        email: "john@example.com",
        phone: 1234567890,
        password: "hashedpassword",
        save: jest.fn().mockResolvedValue(true),
      };

      (User.findOne as jest.Mock).mockResolvedValue(null); // No existing user
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
      (User.prototype.save as jest.Mock).mockImplementation(() => mockUser.save());

      const result = await userRegister(
        "John",
        "Doe",
        "Male",
        "john@example.com",
        1234567890,
        "plaintextpassword"
      );

      expect(result).toEqual({
        message: "User registered successfully",
        data: "John",
      });
      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(bcrypt.hash).toHaveBeenCalledWith("plaintextpassword", 10);
      expect(mockUser.save).toHaveBeenCalled();
    });

    it("should throw error if user already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ email: "john@example.com" });

      await expect(
        userRegister("John", "Doe", "Male", "john@example.com", 1234567890, "plaintextpassword")
      ).rejects.toThrow("User already exists");

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
    });

    it("should throw error on registration failure", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
      (User.prototype.save as jest.Mock).mockImplementation(() => {
        throw new Error("Database Error");
      });

      await expect(
        userRegister("John", "Doe", "Male", "john@example.com", 1234567890, "plaintextpassword")
      ).rejects.toThrow("Something went wrong");
    });
  });

  describe("userLogin", () => {
    it("should log in successfully and return a token", async () => {
      const mockUser = {
        _id: "userId123",
        email: "john@example.com",
        password: "hashedpassword",
        role: "user",
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");

      const result = await userLogin("john@example.com", "plaintextpassword");

      expect(result).toEqual({
        message: "User Logged In Successfully",
        data: mockUser,
        token: "mockToken",
      });
      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith("plaintextpassword", "hashedpassword");
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: "userId123", role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    });

    it("should throw error if email is invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(userLogin("wrong@example.com", "password")).rejects.toThrow(
        "Invalid email or password"
      );

      expect(User.findOne).toHaveBeenCalledWith({ email: "wrong@example.com" });
    });

    it("should throw error if password is incorrect", async () => {
      const mockUser = {
        _id: "userId123",
        email: "john@example.com",
        password: "hashedpassword",
        role: "user",
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(userLogin("john@example.com", "wrongpassword")).rejects.toThrow(
        "Invalid email or password"
      );

      expect(bcrypt.compare).toHaveBeenCalledWith("wrongpassword", "hashedpassword");
    });

    it("should throw an internal error on login failure", async () => {
      (User.findOne as jest.Mock).mockRejectedValue(new Error("Database Error"));

      await expect(userLogin("john@example.com", "password")).rejects.toThrow(
        "Internal Server Error"
      );
    });
  });
});
