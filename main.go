package main

import (
	"log"

	controllers "github/marogosteen/InfectionRisk/InfectionRisk/Controllers"
)

/* TODO
人数selectの11人はどう評価するのか
先生の作った質問長い
*/
func main() {
	homeController := controllers.HomeController{Port: "8080"}
	err := homeController.RunServer()
	if err != nil {
		log.Fatalln(err)
	}
}
