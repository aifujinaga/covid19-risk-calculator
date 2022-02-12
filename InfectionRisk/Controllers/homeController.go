package controllers

import (
	// "net/http"

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

	err = router.Run(":" + c.Port)
	if err != nil {
		return err
	}

	return nil
}

func homeHandler(c *gin.Context) {
	m := models.NewRiskFromViewModel()
	c.HTML(200, "index.html", m)
}

func resultHandler(c *gin.Context) {
	c.HTML(200, "result.html", gin.H{})
}
