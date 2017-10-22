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
		$scope.nomDuCour="rien";
	    $scope.PlaceDuCour="rien";
	    $scope.start_time="rien";
	    $scope.end_time="rien";
	    $scope.institution="rien";
	    $scope.street="rien";
	    $scope.number="rien";
	    $scope.city="rien";
	    $scope.max_number_of_participants="rien";

		





 


	 
	
 
	$scope.afficher = function(formData) {
		var data = { 'course_name': formData };
        $scope.showCourse = true;
        console.log(formData);

        $http.post('/chercher',formData).
        then(function(response) {
        	console.log(response.data[0].place);
            $scope.PlaceDuCour=response.data[0].place;
            $scope.nomDuCour=response.data[0].course_name;
            $scope.start_time=response.data[0].start_time;
            $scope.end_time=response.data[0].end_time;
            $scope.institution=response.data[0].institution;
            $scope.street=response.data[0].street;
            $scope.number=response.data[0].number;
            $scope.city=response.data[0].city;
            $scope.max_number_of_participants=response.data[0].max_number_of_participants;
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
