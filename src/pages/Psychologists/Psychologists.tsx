import { useEffect, useMemo, useState } from "react";
import { getPsychologists } from "../../firebase/db";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import type { PsychologistWithId } from "../../types/psychologist";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import css from "./Psychologists.module.css";

type FilterSortOption =
  | "all"
  | "price-lt-100"
  | "price-gt-100"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "rating-asc"
  | "rating-desc"
  | "popular";

const CARDS_PER_PAGE = 3;

const PsychologistsPage = () => {
  const [psychologists, setPsychologists] = useState<PsychologistWithId[]>([]);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [filterSort, setFilterSort] = useState<FilterSortOption>("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        setLoading(true);
        const data = await getPsychologists();

        setPsychologists(data);
      } catch (error) {
        console.error("Error fetching psychologists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  const filteredAndSortedPsychologists = useMemo(() => {
    let result = [...psychologists];

    if (filterSort === "price-lt-100") {
      result = result.filter((p) => p.price_per_hour < 100);
    }

    if (filterSort === "price-gt-100") {
      result = result.filter((p) => p.price_per_hour > 100);
    }

    switch (filterSort) {
      case "name-asc":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return result.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return result.sort((a, b) => a.price_per_hour - b.price_per_hour);
      case "price-desc":
        return result.sort((a, b) => b.price_per_hour - a.price_per_hour);
      case "rating-asc":
        return result.sort((a, b) => a.rating - b.rating);
      case "rating-desc":
        return result.sort((a, b) => b.rating - a.rating);
      case "popular":
        return result.sort((a, b) => b.reviews.length - a.reviews.length);
      default:
        return result;
    }
  }, [psychologists, filterSort]);

  const visiblePsychologists = filteredAndSortedPsychologists.slice(
    0,
    visibleCount
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  };

  useEffect(() => {
    setVisibleCount(CARDS_PER_PAGE);
  }, [filterSort]);

  const options: { value: FilterSortOption; label: string }[] = [
    { value: "name-asc", label: "Name (A–Z)" },
    { value: "name-desc", label: "Name (Z–A)" },
    { value: "price-lt-100", label: "Less than $100" },
    { value: "price-gt-100", label: "Greater than $100" },
    { value: "price-asc", label: "Price (low → high)" },
    { value: "price-desc", label: "Price (high → low)" },
    { value: "rating-asc", label: "Rating (low → high)" },
    { value: "rating-desc", label: "Rating (high → low)" },
    { value: "popular", label: "Most popular" },
    { value: "all", label: "Show all" },
  ];

  return (
    <div className="container">
      <div className={css.filters}>
        <label htmlFor="filterSort" className={css.label}>
          Filters
        </label>
        <CustomSelect<FilterSortOption>
          options={options}
          value={filterSort}
          onChange={setFilterSort}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={css.list}>
          {visiblePsychologists.map((psychologist) => (
            <li key={psychologist.id}>
              <PsychologistCard psychologist={psychologist} />
            </li>
          ))}
        </ul>
      )}

      {visibleCount < filteredAndSortedPsychologists.length && (
        <button onClick={handleLoadMore} className={css.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
};

export default PsychologistsPage;
