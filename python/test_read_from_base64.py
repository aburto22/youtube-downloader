from pytube import YouTube
import sys
import io
import base64
from pydub import AudioSegment
from pydub.utils import mediainfo

filename = 'All over in 10 seconds.mp3'
extension = 'mp3'
bitrate = '160000'

new_filename = filename.strip('.mp3') + '_reduced.mp3'

audio_file = io.open(filename, 'rb')
print(audio_file)

audio_buffer = io.BytesIO(audio_file.read())
print(audio_buffer)

audio_base64 = base64.b64encode(audio_buffer.getvalue()).decode('ascii')
new_audio_buffer = io.BytesIO(base64.b64decode(audio_base64))
new_audio_buffer.seek(0)

audio = AudioSegment.from_file(new_audio_buffer, format=extension)
reduced_audio = audio[0:6000]
reduced_audio.export(new_filename, format='mp3', bitrate=bitrate)
info = mediainfo(new_filename)
print(info)
