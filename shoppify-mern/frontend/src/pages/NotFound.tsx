/**
 * @author Hemaprakash V
 * @returns A "page not found" page when no existing url path is accessed
 */
const NotFound: React.FC = () => {
 
    return (
      <div className="flex w-full h-full bg-contain bg-no-repeat " style={{backgroundImage: "url('https://th.bing.com/th?id=OIP.OkDEwZoAM6nWesNyRmXYxQHaFI&w=300&h=208&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2')"}}>
        <img src="https://th.bing.com/th?id=OIP.OkDEwZoAM6nWesNyRmXYxQHaFI&w=300&h=208&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          className="w-full h-full object-contain" alt="Page Not Found"
        />
      </div>
    );
  };
   
  export default NotFound;