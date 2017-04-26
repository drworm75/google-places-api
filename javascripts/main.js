$(document).ready(function(){

	$('body').on('click', 'li', (e) => {
		const type = e.target.innerHTML;
		loadPlaces(type).then((results) => {
			writeToDom(results);
			}).catch((error) => {
				console.log(error);
			});
		});

	
	$("body").on("click", ".place", (e) => {
		let place_id = e.target.id;
		console.log(place_id);
		loadDetail(place_id).then((result) => {
			writeAddressToDom(result.formatted_address);
		});

	});

	const loadDetail = (place_id) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`)
			.done((data) => resolve(data.result))
			.fail((error) => reject(error));
		});
	};

	const loadPlaces = (dropdownType) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
				36.174465,-86.767960&radius=50000&type=${dropdownType}&key=${apiKey}`)
		.done((data) => resolve(data.results))
		.fail((error) => reject(error));
		});
	};

	const writeAddressToDom = (address) => {
		let outputString = `<div>${address}</div>`;
		$("#addresses").append(outputString);
	};

	const writeToDom = (results) => {
		let outputString = "";
		console.log(results.length);
		for (let i = 0; i < results.length; i++) {
			outputString += `<a href="#"><div id='${results[i].place_id}'class="place">${results[i].name}</div></a>`;
		}
		$('#input').html(outputString);
		console.log(outputString);
	};

});






