const addCommas = (price) => {
  return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

export const getPersianNums = (num) => {
  const persianNums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num)
    .split("")
    .map((n) => {
      // Check if it is a number, because I want to use this function with addCommmas function
      if (!isNaN(Number(n))) return persianNums[n];
      else return n;
    })
    .join("");
};

export const getPersianPrice = (num) => {
  return getPersianNums(addCommas(num)) + " تومان";
};

// const e2p = s => s.replace(/\d+/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
export const convertNumsToPersian = (str) => {
  return str.replace(/\d+/g, (d) => {
    // if the previous letter of next letter of the number is english, then don't convert it to persian
    if (
      !str[str.indexOf(d) - 1].match(/[A-Za-z]/) &&
      !str[str.indexOf(d) + d.length].match(/[A-Za-z]/)
    )
      return getPersianNums(d);
    else return d;
  });
};
