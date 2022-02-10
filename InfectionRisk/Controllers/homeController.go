package controllers

import (
	"github.com/gin-gonic/gin"

	models "github/marogosteen/InfectionRisk/InfectionRisk/Models"
)

type HomeController struct {
	Port string
}

func (c *HomeController) RunServer() error {
	router := gin.Default()
	err := router.SetTrustedProxies(nil)
	if err != nil {
		return err
	}

	router.Static("/scripts", "InfectionRisk/Views/Scripts")
	router.LoadHTMLGlob("InfectionRisk/Views/*.html")

	router.GET("/", homeHandler)
	router.GET("/result/", resultHandler)

	router.Run(":" + c.Port)

	return nil
}

func homeHandler(c *gin.Context) {
	c.HTML(200, "index.html", gin.H{})
}

func resultHandler(c *gin.Context) {
	m, err := models.ConvertRiskCalcModel(c)
	if err != nil {

	}
	risk := m.CalcRisk()

	c.HTML(200, "result.html", gin.H{"Risk": risk})
}
