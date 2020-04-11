export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const parseISOtoDate = dateISO => {
  const date = String(dateISO);
  return date
    .substr(0, 10)
    .split('-')
    .reverse()
    .join('/');
};

export const parseDateToIso = date => {
  const dateISO = String(date);

  return dateISO
    .substr(0, 10)
    .split('/')
    .reverse()
    .join('-');
};
