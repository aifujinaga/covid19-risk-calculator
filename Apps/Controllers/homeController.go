package controllers

import (
	"github.com/gin-gonic/gin"

	models "github/marogosteen/InfectionRisk/Apps/Models"
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

	router.Static("/scripts", "Apps/Views/Scripts")
	router.LoadHTMLGlob("Apps/Views/*.html")

	router.GET("/", homeHandler)
	router.GET("/policy", policyHandler)

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

func policyHandler(c *gin.Context) {
	c.HTML(200, "policy.html", gin.H{})
}
