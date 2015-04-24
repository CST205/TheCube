<?
$url = base64_decode($_GET['song']);
$file = "song";
system("youtube-dl ".$url." -x -o \"".$file.".%(ext)s\"");
system("ffmpeg -i ".$file.".m4a ".$file.".mp3");

