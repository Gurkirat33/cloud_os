import { widgets } from "@/data/widgets";
import { Folder } from "lucide-react";

export default function AppWidgets() {
  const getFileIcon = (widget: any) => {
    if (widget.type === "folder") {
      return (
        <div className="relative">
          <Folder className="w-8 h-8 text-yellow-400" fill="currentColor" />
          <div className="absolute inset-0 w-8 h-8 opacity-20">
            <Folder className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      );
    }

    return (
      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-sm border border-gray-300 shadow-sm">
        {widget.icon}
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-50px)] w-full p-4 overflow-hidden">
      <div
        className="grid grid-flow-col auto-cols-min gap-3 h-full overflow-x-auto"
        style={{ gridTemplateRows: "repeat(auto-fill, 100px)" }}
      >
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="w-24 h-24 p-1 cursor-pointer hover:bg-blue-50/30 hover:border  rounded-lg flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
          >
            <div className="flex items-center justify-center group-hover:scale-105 transition-transform">
              {getFileIcon(widget)}
            </div>
            <span className="text-white font-medium text-xs text-center truncate w-full leading-tight px-1 ">
              {widget.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
