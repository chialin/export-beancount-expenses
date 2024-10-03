const formatDate = (date: Date) => {
  return date
    .toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-'); // 將 '/' 替換為 '-'
};

export default formatDate;
