$(function(){
	
	//write your code here

	let raceBtn = $(`#raceBtn`)
	let startOverBtn = $(`#startOverBtn`)

	raceBtn.on(`click`, function(e) {
		e.preventDefault()

		$(`#raceTrack`).animate({
			opacity: `0.5`
		}, 100).delay(3000).animate({
			opacity: `1`
		}, 100)

		raceBtn.attr(`disabled`, `true`)
		startOverBtn.attr(`disabled`, `true`)

		let count = 3
		$(`#counter`).show()
		$(`#counter`).text(count)

		function counting(){
			if(count > 1){
				count--
				$(`#counter`).text(count)
			}else{
				$(`#counter`).text(``)
				clearInterval(timer)
			}
		}

		let timer = setInterval(function(){
			counting()
			if(count < 1){
				clearInterval(timer)
			}
		}, 1000)

		let carWidth = $(`#carOne`).width()
		let raceTrackWidth = $(window).width() - carWidth

		let raceTimeOne = Math.floor((Math.random() * 5000) + 1);
		let raceTimeTwo = Math.floor((Math.random() * 5000) + 1);

		let isFinished = false

		let place = `first`
		function isComplete(){
			if(isFinished === false){
				isFinished = true
				$(`#flag`).css(`display`, `block`)
				$(`#raceTrack`).css(`opacity`, 0.5)
				startOverBtn.removeAttr(`disabled`)
			}else{
				place = `second`
			}
		}

		$(`#carOne`).delay(3000).animate({
			left:raceTrackWidth
		}, raceTimeOne, function(){
			isComplete()
			$(`#leftResult`).append(`<div class="carLeft">Finished in: <span class="text-white font-weight-bold">${place}</span> place with a time of: <span class="text-white font-weight-bold">${raceTimeOne}</span> milliseconds</div>`)

			localStorage.setItem('firstCar', `<div class="carLeft"><span class="text-white font-weight-bold">Car1</span> finished in <span class="text-white font-weight-bold">${place}</span>, with a time of <span class="text-white font-weight-bold">${raceTimeOne}</span> milliseconds!</div>`)
		})

		$('#carTwo').delay(3000).animate({
			left: raceTrackWidth
		}, raceTimeTwo, function () {
			isComplete()
			$('#rightResult').append(`<div class="carRight">Finished in: <span class="text-danger font-weight-bold">${place}</span> place with a time of: <span class="text-danger font-weight-bold">${raceTimeTwo}</span> milliseconds</div>`)

			localStorage.setItem('secondCar', `<div class="carRight"><span class="text-danger font-weight-bold">Car2</span> finished in <span class="text-danger font-weight-bold">${place}</span>, with a time of <span class="text-danger font-weight-bold">${raceTimeTwo}</span> milliseconds!</div>`)
		})
	
	})

	startOverBtn.on(`click`, function(e) {
		e.preventDefault()
		raceBtn.removeAttr(`disabled`)
		$(`#flag`).css(`display`, `none`)
		$(`#raceTrack`).css(`opacity`, 1)
		$(`#carOne`).css(`left`, 0)
		$(`#carTwo`).css(`left`, 0)
	})

	let firstCarStorage = localStorage.getItem(`firstCar`)
	let secondCarStorage = localStorage.getItem(`secondCar`)

	if(firstCarStorage || secondCarStorage){
		$('#storage').append(`<h3 class="mb-5">Results from the previous time you played this game:</h3>`)
		$('#storage').append(firstCarStorage)
		$('#storage').append(secondCarStorage)
	}

	

	localStorage.clear()

})