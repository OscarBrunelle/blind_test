let count_duration = 10;
let count = count_duration;
let count_start_time = null;
const songs_path = "songs/";
let songs_category = "unknown";
let songs_in_category = [];

let current_audio_player = null;
let current_song_info = null;

function load() {
	document.querySelector("#counter").style.display = "none";
	document.querySelector("#song-title").style.display = "none";
}

function start_blindtest() {
	document.querySelector("#start_blindtest-button").remove();
	document.querySelector("#counter").style.display = "grid";
	document.querySelector("#song-title").style.display = "grid";
	set_songs_in_category();
	if (songs_in_category.length <= 0) {
		console.error("No songs in playlist");
		return;
	}
	play_new_random_music();
}

function choose_random_song() {
	const random_song_index = random_int(0, songs_in_category.length - 1);
	return songs_in_category[random_song_index];
}

function play_new_random_music() {
	if (current_audio_player != null) {
		current_audio_player.pause();
	}
	current_song_info = choose_random_song();
	current_audio_player = new Audio(songs_path + current_song_info.file_name);
	current_audio_player.volume = 0.1;
	current_audio_player.play();
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
		document.querySelector("#counter>span").innerHTML = current_song_info.title;
		setTimeout(play_new_random_music, 5000);
	}
}

function set_songs_in_category() {
	songs_in_category = [];
	for (song of SONGS_LIST) {
		if (song.categories.indexOf(songs_category) >= 0) {
			songs_in_category.push(song);
		}
	}
	return songs_in_category;
}

document.onload = load();