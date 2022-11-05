let count_duration = 10;
let count = count_duration;
let count_start_time = null;

let current_audio = null;

function load() {
	document.querySelector("#counter").style.display = "none";
	document.querySelector("#song-title").style.display = "none";
}

function start_blindtest() {
	document.querySelector("#counter").style.display = "grid";
	document.querySelector("#song-title").style.display = "grid";
	play_new_random_music();
}

function choose_random_song() {
	return "songs/Gunther - Ding Dong Song.mp3";
}

function play_new_random_music() {
	if (current_audio != null) {
		current_audio.pause();
	}
	let song_path = choose_random_song();
	current_audio = new Audio(song_path);
	current_audio.volume = 0.1;
	current_audio.play();
	start_countdown();
}

function start_countdown() {
	count = count_duration;
	count_start_time = new Date();
	update_countdown();
	update_countdown_interval = setInterval(update_countdown, 15);
}

function update_countdown() {
	let displayed_count = Math.max(Math.ceil(count_duration - ((new Date()) - count_start_time) / 1000), 0);
	document.querySelector("#counter>span").innerHTML = displayed_count;
	if (displayed_count == 0) {
		clearInterval(update_countdown_interval);
		document.querySelector("#counter>span").innerHTML = "my tralala";
		setTimeout(play_new_random_music, 5000);
	}
}

document.onload = load();