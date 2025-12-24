package domain

import (
	"crypto/rand"
	"errors"

	"github.com/Krysik/gql-federation-demo/graph/model"
)

var reviews = []*model.Review{
	&model.Review{
		ID:      "id-1",
		Title:   "Title 1",
		Content: "Content 1",
	},
}

func CreateReview(title, content string) (*model.Review, error) {
	review := model.Review{
		ID:      rand.Text(),
		Title:   title,
		Content: content,
	}
	reviews = append(reviews, &review)

	return &review, nil
}

func GetReviews() ([]*model.Review, error) {
	return reviews, nil
}

var ReviewNotFoundErr = errors.New("review not found")

func FindReviewById(id string) (*model.Review, error) {
	for _, r := range reviews {
		if r.ID == id {
			return r, nil
		}
	}

	return nil, ReviewNotFoundErr
}

func FindReviewsByMovieId(movieId string) ([]*model.Review, error) {
	// DB CALL
	return reviews, nil
}
