export const formatTimeAgo = (dateString, t) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - postDate) / 1000);
  const hours = Math.floor(seconds / 3600);

  if (hours < 1) {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 1) return t.search.justNow;
    return `${minutes} ${t.search.minutes}`;
  }

  return `${hours} ${t.search.hours}`;
};