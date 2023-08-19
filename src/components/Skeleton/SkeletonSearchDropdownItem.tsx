import "../../styles/Components/Skeleton/skeletonSearchItem.scss";

export const SkeletonSearchDropdownItem = () => {
  return (
    <div className="search__dropdown-item search-item">
      <div className="search__dropdown-img search-item__img"></div>
      <div className="search-item__text">
        <div className="search-item__name"></div>
        <div className="search-item__bottom"></div>
      </div>
    </div>
  );
};
