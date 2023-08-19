import "../../styles/Components/Skeleton/skeletonCard.scss";

export const SkeletonCard = () => {
  return (
    <div className="card skeleton-card">
      <div className="card__img skeleton-card__img"></div>
      <div className="skeleton-card__text">
        <div className="skeleton-card__line"></div>
        <div className="skeleton-card__line"></div>
        <div className="skeleton-card__line--blank"></div>
        <div className="skeleton-card__line"></div>
      </div>
    </div>
  );
};
