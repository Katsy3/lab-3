function changeOffer() {
  const offer = document.querySelector('.offer p');
  if (offer.textContent.includes('20%')) {
    offer.textContent = 'Спеціальна пропозиція: Знижка 20% на перше відвідування!';
  }
}