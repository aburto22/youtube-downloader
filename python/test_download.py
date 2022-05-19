from pytube import YouTube
import sys
import io
from pydub import AudioSegment
from pydub.utils import mediainfo

youtube_url = 'https://www.youtube.com/watch?v=rUWxSEwctFU&ab_channel=IanRushton'

try:
  yt = YouTube(youtube_url)
except:
  print('Connection error')
  sys.exit()

video_track = yt.streams.filter(only_audio = True).order_by('abr').desc().first()

extension = video_track.subtype
bitrate = video_track.abr.replace('kbps', '000')
title = video_track.title + '.mp3'

print(title)
print(extension)
print(bitrate)

video_buffer = io.BytesIO()
video_track.stream_to_buffer(video_buffer)
video_buffer.seek(0)

audio = AudioSegment.from_file(video_buffer, format=extension)
audio.export(title, format='mp3', bitrate=bitrate)
info = mediainfo(title)
print(info)
