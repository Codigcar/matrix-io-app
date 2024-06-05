import TrackPlayer from 'react-native-track-player';

module.exports = (async () => {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
});
