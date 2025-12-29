import { useState } from "react";
import type { Psychologist } from "../../types/psychologist";
import { useAuth } from "../../context/auth/useAuth";
import { useModal } from "../../context/modal/useModal";
import { ModalType } from "../../types/modal";
import css from "./PsychologistCard.module.css";

interface Props {
  psychologist: Psychologist;
}

export default function PsychologistCard({ psychologist }: Props) {
  const {
    avatar_url,
    name,
    rating,
    price_per_hour,
    experience,
    license,
    specialization,
    initial_consultation,
    about,
    reviews,
  } = psychologist;

  const { user, loading } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { openModal } = useModal();

  const handleFavoriteClick = () => {
    if (!user) {
      openModal(ModalType.LOGIN);
      return;
    }

    setIsFavorite((prev) => !prev);
  };

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img
          src={avatar_url ?? "/avatar/defaultAvatar.webp"}
          alt={name}
          className={css.avatar}
          decoding="async"
          loading="lazy"
        />
      </div>

      <div className={css.content}>
        <div className={css.topRow}>
          <div>
            <h4 className={css.role}>Psychologist</h4>
            <h3 className={css.name}>{name}</h3>
          </div>

          <div className={css.meta}>
            <span className={css.rating}>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-star"></use>
              </svg>
              <h4>Rating: {rating}</h4>
            </span>

            <h4 className={css.price}>
              Price / 1 hour:{" "}
              <span className={css.value}>${price_per_hour}</span>
            </h4>

            <button
              type="button"
              onClick={handleFavoriteClick}
              className={`${css.favoriteBtn} ${
                isFavorite ? css.isFavorite : ""
              }`}
              disabled={loading}
            >
              <svg width="22" height="19" className={css.iconHeart}>
                <use
                  href={
                    isFavorite
                      ? "/sprite.svg#icon-heart-green"
                      : "/sprite.svg#icon-heart"
                  }
                ></use>
              </svg>
            </button>
          </div>
        </div>

        <div className={css.chips}>
          <span className={css.chip}>
            Experience: <span className={css.chipValue}>{experience}</span>
          </span>
          <span className={css.chip}>
            License: <span className={css.chipValue}>{license}</span>
          </span>
          <span className={css.chip}>
            Specialization:{" "}
            <span className={css.chipValue}>{specialization}</span>
          </span>
          <span className={css.chip}>
            Initial Consultation:{" "}
            <span className={css.chipValue}>{initial_consultation}</span>
          </span>
        </div>

        <p className={css.about}>{about}</p>

        <button type="button" className={css.readMore} onClick={toggleReadMore}>
          {isExpanded ? "Hide reviews" : "Read more"}
        </button>

        {isExpanded && (
          <div className={css.reviews}>
            {reviews.map((review, index) => (
              <div key={index} className={css.review}>
                <div className={css.reviewHeader}>
                  <div className={css.reviewerAvatar}>
                    {review.reviewer.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4 className={css.reviewer}>{review.reviewer}</h4>
                    <div className={css.reviewerRating}>
                      <svg width="16" height="16">
                        <use href="/sprite.svg#icon-star"></use>
                      </svg>
                      <span>{review.rating}</span>
                    </div>
                  </div>
                </div>

                <p className={css.comment}>{review.comment}</p>
              </div>
            ))}
            <button className={css.appointmentBtn}>Make an appointment</button>
          </div>
        )}
      </div>
    </div>
  );
}
