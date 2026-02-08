import { Link } from "react-router";
import { Button } from "../../Components/Button/Button";

const Error = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-calsans">No page found....</h2>
        <Link to="/">
          <Button variant="normal" size="normal" className="text-white bg-background-sub">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
