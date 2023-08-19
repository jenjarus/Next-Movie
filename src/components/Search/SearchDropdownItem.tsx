import Image from "next/image";
import Link from "next/link";
import { TypeCard } from "../../utils/types";
import { BLUR_IMG } from "../../utils/constants";
import "../../styles/Components/Search/searchDropdownItem.scss";

type TypeSearchDropdownItem = { data: TypeCard };

export const SearchDropdownItem = ({ data }: TypeSearchDropdownItem) => {
  const rating: string = data.rating !== "null" ? data.rating : "-";
  const id: number = data.filmId;

  return (
    <Link href={`/film/${id}`} className="search__dropdown-item">
      <div className="search__dropdown-img">
        <Image
          src={data.posterUrlPreview}
          width={48}
          height={64}
          alt={data.nameRu}
          placeholder="blur"
          blurDataURL={BLUR_IMG}
        />
      </div>
      <div className="search__dropdown-info">
        <div className="search__dropdown-name">{data.nameRu}</div>
        <div className="search__dropdown-bottom">
          {data.rating && <div className="search__dropdown-rating">{rating}</div>}
          <div className="search__dropdown-genres">
            {data.genres[0] ? data.genres[0].genre : ""}
          </div>
          <div className="search__dropdown-date">{data.year}</div>
        </div>
      </div>
    </Link>
  );
};
