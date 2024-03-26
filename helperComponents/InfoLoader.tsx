import "./Loader.css";
const InfoLoader = () => {
  return (
    <div className="flex flex-col space-y-1">
      <span className="w-16 h-4 skeleton-text"></span>
      <span className="w-24 h-4 skeleton-text"></span>
    </div>
  );
};

export default InfoLoader;
