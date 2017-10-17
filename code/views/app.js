angular.module("Webmail", [ "ngSanitize" ])
.controller("WebmailCtrl",  function($scope, $location,$http) {
	
	$scope.dossiers = [
		{ value: "BJ", label: 'home', text: 
		"this is a home page", description:"Bienvenue sur notre site web  "
		 }, 
		{ value: "ARCHIVES", label: "course", text: 
		"thisis a list of courses",description:" <h2>CHERCHER UN COURS</h2>  "
		  },
		{ value: "ENVOYES", label: "sign in", text: 
		"list of courses",description:"inscris toi dès maintenant"
		 },
		{ value: "SPAM", label: "contact", text: 
		"contact part",description:"contact:"
		 }
	];

	$scope.dossierCourant = null;

	$scope.showCourse = false;
	$scope.nomDuCour="heloo";

 


	 
	
 
	$scope.afficher = function(formData) {
        $scope.showCourse = true;
        console.log(formData);

        $http.post('/chercher',formData).
        then(function(response) {
            $scope.nomDuCour=response.data;
            console.log("posted successfully");
        }).catch(function(response) {
            console.error("error in posting");
        });
    }



   



	

	 
		


	 
	$scope.selectionDossier = function(dossier) {
		$scope.dossierCourant = dossier;
	}

               


	

	$scope.$watch(function() {
		return $location.path();
	}, function(newPath) {
		var tabPath = newPath.split("/");
		if (tabPath.length > 1) {
			var valDossier = tabPath[1];
			$scope.dossiers.forEach(function(item) {
				if (item.value == valDossier) {
					$scope.selectionDossier(item);
				}
			});
			if (tabPath.length > 2) {
				var idMail = tabPath[2];
				$scope.dossierCourant.emails.forEach(function(item) {
					if (item.id == idMail) {
						$scope.selectionEmail(item);
					}
				});
			}
		}
	});

	
});
