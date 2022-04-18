package main

import (
	"log"
	"os"

	controllers "github/marogosteen/InfectionRisk/Apps/Controllers"
)

func main() {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "8080"
	}
	ginMode := os.Getenv("RELEASE")

	homeController := controllers.HomeController{
		Port:    port,
		GinMode: ginMode,
	}
	err := homeController.RunServer()
	if err != nil {
		log.Fatalln(err)
	}
}
