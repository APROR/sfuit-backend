const getcriticalDescription = (payload) => {
  const { heart, spo2, temp } = payload;
  heart = parseInt(heart);
  spo2 = parseInt(spo2.split("%")[0]);
  temp = Math.ceil(parseFloat(temp));
  if (heart < 35 && heart > 150)
    return {
      title: "Abnormal Heart Rate",
      description: `Heart Rate is Critical ${heart} BPM`,
    };
  if (spo2 < 85)
    return {
      title: "Shortness Of Breath",
      description: `Blood Oxygen Level Is Low : ${spo2}%`,
    };
  if (temp > 100)
    return {
      title: "Fever ?",
      description: `Feels Like You Have Fever : ${temp}*F`,
    };
};

module.exports = {
  getcriticalDescription: getcriticalDescription,
};
