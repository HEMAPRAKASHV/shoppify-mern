import { Request, Response } from "express";
import { Register_User, Login_User } from "../../controllers/authController";
import { userRegister, userLogin } from "../../service/authService";
import { validationResult } from "express-validator";

jest.mock("../../service/authService", () => ({
    userRegister: jest.fn(),
    userLogin: jest.fn(),
}));

jest.mock("express-validator", () => ({
    validationResult: jest.fn().mockReturnValue({
        isEmpty: jest.fn().mockReturnValue(true),
        array: jest.fn().mockReturnValue([]),
    }),
}));

describe("Auth Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = { status: statusMock };
    });

    describe("Register_User", () => {
        beforeEach(() => {
            req = {
                body: {
                    firstName: "John",
                    lastName: "Doe",
                    gender: "Male",
                    email: "john@example.com",
                    phone: "1234567890",
                    password: "password123",
                },
            };
        });

        it("should return 422 if validation fails", async () => {
            (validationResult as unknown as jest.Mock).mockReturnValueOnce({
                isEmpty: jest.fn().mockReturnValue(false),
                array: jest.fn().mockReturnValue(["error"]),
            });

            await Register_User(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(422);
            expect(jsonMock).toHaveBeenCalledWith({ errors: ["error"] });
        });

        it("should return 201 with response if registration succeeds", async () => {
            (userRegister as jest.Mock).mockResolvedValue({ success: true });

            await Register_User(req as Request, res as Response);

            expect(userRegister).toHaveBeenCalledWith(
                "John",
                "Doe",
                "Male",
                "john@example.com",
                "1234567890",
                "password123"
            );
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({ success: true });
        });

        it("should return 500 if an error occurs", async () => {
            (userRegister as jest.Mock).mockRejectedValue(new Error("Database error"));

            await Register_User(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith("Internal Server Error");
        });
    });

    describe("Login_User", () => {
        beforeEach(() => {
            req = {
                body: {
                    email: "john@example.com",
                    password: "password123",
                },
            };
        });

        it("should return 422 if validation fails", async () => {
            (validationResult as unknown as jest.Mock).mockReturnValueOnce({
                isEmpty: jest.fn().mockReturnValue(false),
                array: jest.fn().mockReturnValue(["error"]),
            });

            await Login_User(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(422);
            expect(jsonMock).toHaveBeenCalledWith({ errors: ["error"] });
        });

        it("should return 201 with response if login succeeds", async () => {
            (userLogin as jest.Mock).mockResolvedValue({ token: "fakeToken" });

            await Login_User(req as Request, res as Response);

            expect(userLogin).toHaveBeenCalledWith("john@example.com", "password123");
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({ token: "fakeToken" });
        });

        it("should return 500 if an error occurs", async () => {
            (userLogin as jest.Mock).mockRejectedValue(new Error("Database error"));

            await Login_User(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Internal Server Error" });
        });
    });
});
