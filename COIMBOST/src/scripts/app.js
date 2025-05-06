// League icons configuration
const leagueIcons = {
  'Ferro': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/iron.png',
  'Bronze': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/bronze.png',
  'Prata': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/silver.png',
  'Ouro': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/gold.png',
  'Platina': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/platinum.png',
  'Esmeralda': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/emerald.png',
  'Diamante': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/diamond.png',
  'Mestre': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/master.png',
  'Grão Mestre': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/grandmaster.png',
  'Desafiante': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/challenger.png',
  'unranked': 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/unranked.png'
};

// Helper function to map value to league name
function getLeagueFromValue(value) {
  if (value === '' || value === 'unranked' || value === undefined) return 'unranked';
  const numValue = parseInt(value);
  if (numValue === 29) return 'Grão Mestre';
  if (numValue === 30) return 'Desafiante';
  const leagues = ['Ferro', 'Bronze', 'Prata', 'Ouro', 'Platina', 'Esmeralda', 'Diamante', 'Mestre'];
  const index = Math.floor(numValue / 4);
  return leagues[index] || 'unranked';
}

// Update icons for current and desired leagues
function updateLeagueIcons() {
  const currentEloSelect = document.getElementById('currentElo');
  const desiredEloSelect = document.getElementById('desiredElo');
  const currentLeagueIcon = document.getElementById('currentLeagueIcon');
  const desiredLeagueIcon = document.getElementById('desiredLeagueIcon');

  if (currentEloSelect && desiredEloSelect && currentLeagueIcon && desiredLeagueIcon) {
      const currentLeague = getLeagueFromValue(currentEloSelect.value);
      const desiredLeague = getLeagueFromValue(desiredEloSelect.value);

      currentLeagueIcon.src = leagueIcons[currentLeague] || leagueIcons['unranked'];
      desiredLeagueIcon.src = leagueIcons[desiredLeague] || leagueIcons['unranked'];
  }
}

function calculatePrice() {
  const currentEloSelect = document.getElementById('currentElo');
  const desiredEloSelect = document.getElementById('desiredElo');

  const currentEloIndex = parseInt(currentEloSelect.value);
  const desiredEloIndex = parseInt(desiredEloSelect.value);

  // Verifica se os valores são válidos
  if (isNaN(currentEloIndex) || isNaN(desiredEloIndex)) {
      document.getElementById('result').innerHTML = `<span class="error">Selecione o elo atual e desejado.</span>`;
      document.getElementById('order').innerHTML = "";
      return;
  }

  // Verifica se o elo desejado é maior que o atual
  if (currentEloIndex >= desiredEloIndex) {
      document.getElementById('result').innerHTML = `<span class="error">A divisão desejada deve ser maior que a atual.</span>`;
      document.getElementById('order').innerHTML = "";
      return;
  }

  // Lógica de cálculo de preço
  let totalPrice = 0;
  const prices = {
    Ferro: 8.40,
    Bronze: 9.80,
    Prata: 13.30,
    Ouro: 16.80,
    Platina: 23.80,
    Esmeralda: 46.91,
    Diamante4: 48.97,
    Diamante3: 70.00,
    Diamante2: 76.30,
    Diamante1: 83.30,
    Mestre: 97.30,
    Grandmaster: 560.00,
    Challenger: 840.00
  };

  for (let i = currentEloIndex; i < desiredEloIndex; i++) {
    if (i < 4) totalPrice += prices.Ferro;
    else if (i < 8) totalPrice += prices.Bronze;
    else if (i < 12) totalPrice += prices.Prata;
    else if (i < 16) totalPrice += prices.Ouro;
    else if (i < 20) totalPrice += prices.Platina;
    else if (i < 23) totalPrice += prices.Esmeralda;
    else if (i < 24) totalPrice += prices.Diamante4;
    else if (i < 25) totalPrice += prices.Diamante3;
    else if (i < 26) totalPrice += prices.Diamante2;
    else if (i < 27) totalPrice += prices.Diamante1;
    else if (i < 28) totalPrice += prices.Mestre;
    else if (i < 29) totalPrice += prices.Grandmaster;
    else if (i < 30) totalPrice += prices.Challenger;
  }

  // Atualiza o resultado no HTML
  const displayPrice = totalPrice.toFixed(2);
  document.getElementById('result').innerHTML = `<span class="new-price">R$ ${displayPrice}</span><br>Preço total:`;
  document.getElementById('order').innerHTML = `<span class="order-details">PEDIDO: ${currentEloSelect.selectedOptions[0].text} AO ${desiredEloSelect.selectedOptions[0].text}</span>`;
}

// Update icon for last league
function updateLastLeagueIcon() {
  const lastEloSelect = document.getElementById('lastElo');
  const lastLeagueIcon = document.getElementById('lastLeagueIcon');
  
  if (lastEloSelect && lastLeagueIcon) {
      const lastLeague = lastEloSelect.value;
      lastLeagueIcon.src = leagueIcons[lastLeague] || leagueIcons['unranked'];
  }
}

// Event listeners for updating icons
document.addEventListener('DOMContentLoaded', function() {
  // Add loading indicators
  setupLoadingIndicators();
  
  // Add tooltips to elements that need explanation
  setupTooltips();
  
  // Add smooth page transitions
  setupSmoothTransitions();
  
  // Enhance form elements
  enhanceFormElements();
});

/**
* Setup loading indicators for actions that might take time
*/
function setupLoadingIndicators() {
  const payButton = document.getElementById('payButton');
  if (payButton) {
      payButton.addEventListener('click', function() {
          showLoading(this, 'Processando...');
          setTimeout(() => resetButton(this), 2000); // Simulate process completion
      });
  }

  const couponButtons = document.querySelectorAll('#couponButton, #md5CouponButton');
  couponButtons.forEach(button => {
      button.addEventListener('click', function() {
          showLoading(this, 'Aplicando...');
          setTimeout(() => resetButton(this), 300); // Simulate process completion
      });
  });
}
function applyCoupon() {
  const couponInput = document.getElementById('coupon');
  const couponCode = couponInput.value.trim();
  const resultElement = document.getElementById('result');

  // Lista de cupons válidos e seus descontos (em porcentagem)
  const coupons = {
      "COIMBROX10": 10, // 10% de desconto
  };

  // Verifica se o cupom é válido
  if (coupons[couponCode]) {
      const discount = coupons[couponCode];
      const currentPriceText = resultElement.querySelector('.new-price').innerText.replace('R$', '').trim();
      const currentPrice = parseFloat(currentPriceText);

      // Calcula o novo preço com desconto
      const discountedPrice = (currentPrice * (1 - discount / 100)).toFixed(2);

      // Atualiza o preço no HTML
      resultElement.innerHTML = `<span class="new-price">R$ ${discountedPrice}</span><br>Preço total com ${discount}% de desconto!`;
  } else {
      // Exibe mensagem de erro se o cupom for inválido
      resultElement.innerHTML = `<span class="error">Cupom inválido. Tente novamente.</span>`;
  }
}
function showLoading(button, text) {
  const originalText = button.innerHTML;
  button.setAttribute('data-original-text', originalText);
  button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
  button.disabled = true;
  button.classList.add('loading');
}

function resetButton(button) {
  const originalText = button.getAttribute('data-original-text');
  if (originalText) {
      button.innerHTML = originalText;
  }
  button.disabled = false;
  button.classList.remove('loading');
}

/**
* Setup tooltips for elements that need explanation
*/
function setupTooltips() {
  const elementsWithTooltips = [
      { id: 'currentElo', text: 'Selecione sua liga atual para calcular o preço do serviço' },
      { id: 'desiredElo', text: 'Selecione a liga que você deseja alcançar' },
      { id: 'lastElo', text: 'Selecione sua liga na temporada anterior' },
      { id: 'victories', text: 'Número de vitórias desejadas para o serviço MD5' },
      { id: 'coupon', text: 'Insira um código promocional para obter desconto' },
      { id: 'md5Coupon', text: 'Insira um código promocional para obter desconto no MD5 Boost' },
      { id: 'toggleButton', text: 'Alterne entre os serviços de Elo Boost e MD5 Boost' },
      { id: 'payButton', text: 'Clique para pagar com Pix' }
  ];

  elementsWithTooltips.forEach(({ id, text }) => {
      const element = document.getElementById(id);
      if (element) {
          element.setAttribute('data-tooltip', text);
          element.addEventListener('mouseenter', showTooltip);
          element.addEventListener('mouseleave', hideTooltip);
      }
  });
}

function showTooltip(event) {
  const tooltipText = event.target.getAttribute('data-tooltip');
  if (!tooltipText) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.innerText = tooltipText;
  document.body.appendChild(tooltip);

  const rect = event.target.getBoundingClientRect();
  tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
  tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`;
  tooltip.classList.add('visible');
}

function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
      tooltip.remove();
  }
}

/**
* Setup smooth transitions between sections
*/
function setupSmoothTransitions() {
  const containers = document.querySelectorAll('.container');
  containers.forEach(container => {
      container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
}

/**
* Enhance form elements with better visual feedback
*/
function enhanceFormElements() {
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
      select.addEventListener('change', function() {
          this.classList.toggle('selected', !!this.value);
      });
  });

  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
      input.addEventListener('focus', () => input.classList.add('focused'));
      input.addEventListener('blur', () => input.classList.remove('focused'));
  });
}

// Snowflake animation functionality
function createSnowflakes() {
  const snowflakeContainer = document.querySelector('.snowflakes');

  // Define maximum number of simultaneous snowflakes
  const maxSnowflakes = 30;

  // List of emojis with sunglasses
  const coolEmojis = ['👾'];

  for (let i = 0; i < maxSnowflakes; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';

      // Select a random emoji from the list
      snowflake.innerHTML = coolEmojis[Math.floor(Math.random() * coolEmojis.length)];

      // Random initial horizontal and vertical position
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.top = Math.random() * -200 + 'px';

      // Dynamic animation
      snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
      snowflake.style.animationDelay = Math.random() * 10 + 's';
      snowflake.style.fontSize = Math.random() * 10 + 20 + 'px';

      snowflakeContainer.appendChild(snowflake);
  }
}
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa os ícones
  updateLeagueIcons();

  // Configura eventos para os selects
  const currentEloSelect = document.getElementById('currentElo');
  const desiredEloSelect = document.getElementById('desiredElo');

  if (currentEloSelect && desiredEloSelect) {
      currentEloSelect.addEventListener('change', () => {
          updateLeagueIcons();
          calculatePrice();
      });
      desiredEloSelect.addEventListener('change', () => {
          updateLeagueIcons();
          calculatePrice();
      });
  }

  // Inicializa o cálculo de preço
  calculatePrice();
});