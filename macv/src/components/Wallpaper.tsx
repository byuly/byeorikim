import { useSystemStore, wallpapers } from "../store/useSystemStore";

export default function Wallpaper() {
  const wallpaperId = useSystemStore((s) => s.wallpaper);
  const wp = wallpapers[wallpaperId];

  const style = wp.image
    ? { backgroundImage: `url(${wp.image})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: wp.css };

  return (
    <div
      className="fixed inset-0 -z-10 transition-all duration-700"
      style={style}
    />
  );
}
