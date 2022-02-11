package models

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func ConvertResultViewModel(c *gin.Context) (*ResultViewModel, error) {
	infectionCount, err := strconv.ParseFloat(c.Query("infectionCount"), 64)
	if err != nil {
		return nil, err
	}
	contactCountPerDay, err := strconv.ParseFloat(c.Query("contactCountPerDay"), 64)
	if err != nil {
		return nil, err
	}
	maskType, err := strconv.ParseFloat(c.Query("maskType"), 64)
	if err != nil {
		return nil, err
	}
	distance, err := strconv.ParseFloat(c.Query("distance"), 64)
	if err != nil {
		return nil, err
	}
	ventilation, err := strconv.ParseFloat(c.Query("ventilation"), 64)
	if err != nil {
		return nil, err
	}
	handWash, err := strconv.ParseFloat(c.Query("handWash"), 64)
	if err != nil {
		return nil, err
	}
	disinfection, err := strconv.ParseFloat(c.Query("disinfection"), 64)
	if err != nil {
		return nil, err
	}
	contactRate, err := strconv.ParseFloat(c.Query("contactRate"), 64)
	if err != nil {
		return nil, err
	}

	contactProbability := infectionCount * contactCountPerDay
	aerosolRisk := maskType * distance * ventilation
	contactRisk := handWash * disinfection * contactRate
	infectionRisk := contactProbability * (aerosolRisk + contactRisk)

	m := ResultViewModel{
		ContactProbability: contactProbability,
		AerosolRisk:        aerosolRisk,
		ContactRisk:        contactRisk,
		InfectionRisk:      infectionRisk,
	}

	return &m, nil
}

type ResultViewModel struct {
	ContactProbability float64
	AerosolRisk        float64
	ContactRisk        float64
	InfectionRisk      float64
}
