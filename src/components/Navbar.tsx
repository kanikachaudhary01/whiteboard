import { Pen, RectangleHorizontal, Circle } from "lucide-react";

interface NavbarProps {
//   currentTool: string;
  setCurrentTool: (tool: string) => void;
}

const Navbar = ({  setCurrentTool }: NavbarProps) => {
  return (
    <div className="fixed top-5 left-1/4 w-1/2 px-5 py-2 flex items-center gap-5 divide-x-2 border-2 border-gray-200 rounded-xl bg-white z-50">
      <button onClick={() => setCurrentTool("pen")}><Pen /></button>
      <button onClick={() => setCurrentTool("rectangle")}><RectangleHorizontal /></button>
      <button onClick={() => setCurrentTool("circle")}><Circle /></button>
    </div>
  );
};

export default Navbar;
