package models

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func ConvertRiskCalcModel(c *gin.Context) (*RiskCalcModel, error) {
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

	m := RiskCalcModel{
		InfectionCount:     infectionCount,
		ContactCountPerDay: contactCountPerDay,
		MaskType:           maskType,
		Distance:           distance,
		Ventilation:        ventilation,
		HandWash:           handWash,
		Disinfection:       disinfection,
		ContactRate:        contactRate,
	}

	return &m, nil
}

type RiskCalcModel struct {
	InfectionCount     float64
	ContactCountPerDay float64
	MaskType           float64
	Distance           float64
	Ventilation        float64
	HandWash           float64
	Disinfection       float64
	ContactRate        float64
}

func (m *RiskCalcModel) CalcRisk() float64 {
	isInfectedRisk := m.InfectionCount * m.ContactCountPerDay
	aerosolRisk := m.MaskType * m.Distance * m.Ventilation
	contactRisk := m.HandWash * m.Disinfection * m.ContactRate
	return isInfectedRisk * (aerosolRisk + contactRisk)
}
