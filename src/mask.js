export const cpfMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const cepMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

export const cnpjMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const phoneMask = value => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
}

export const moneyMask = value => {
  
  let cleanValue = parseInt(value.replace(",", '')).toString();

  if(cleanValue.length == 1){
    return cleanValue
    .replace(/\D/g, '')
    .replace(/(\d{1})/, '0,0$1')
  }else if(cleanValue.length == 2){
    return cleanValue
    .replace(/\D/g, '')
    .replace(/(\d{2})/, '0,$1')
  }
  return cleanValue
    .replace(/\D/g, '')
    .replace(/(\d+)(\d{2})/, '$1,$2')
}