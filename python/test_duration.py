import sys
import io
from pydub import AudioSegment
from pydub.utils import mediainfo

filename = 'Ed Sheeran - Shape of You.mp3'
new_filename = filename.replace('.mp3', '') + '_reduced.mp3'
bitrate = mediainfo(filename)['bit_rate']
start = 0
end = 3 * 60 + 59
sound_increase = 6

print(bitrate)

clip = AudioSegment.from_mp3(filename)

print(clip.duration_seconds)

reduced_clip = clip[start * 1000: end * 1000] + sound_increase

print(reduced_clip.duration_seconds)

reduced_clip.export(new_filename, format='mp3', bitrate=bitrate)
info = mediainfo(new_filename)
print(info)

