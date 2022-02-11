package main

import (
	"log"

	controllers "github/marogosteen/InfectionRisk/InfectionRisk/Controllers"
)

func main() {
	homeController := controllers.HomeController{Port: "8000"}
	err := homeController.RunServer()
	if err != nil {
		log.Fatalln(err)
	}
}
