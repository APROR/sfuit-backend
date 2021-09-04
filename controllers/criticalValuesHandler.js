const getcriticalDescription = (payload) => {
  let { BPM, SpO2, Temprature } = payload;
  // BPM = parseInt(BPM);
  // SpO2 = parseInt(SpO2.split("%")[0]);
  // Temprature = Math.ceil(parseFloat(temp));
  if (BPM < 35 && BPM > 150)
    return {
      title: "Abnormal Heart Rate",
      description: `Heart Rate is Critical ${BPM} BPM`,
    };
  if (SpO2 < 85)
    return {
      title: "Shortness Of Breath",
      description: `Blood Oxygen Level Is Low : ${SpO2}%`,
    };
  if (Temprature > 100)
    return {
      title: "Fever ?",
      description: `Feels Like You Have Fever : ${Temprature}*F`,
    };
};

module.exports = {
  getcriticalDescription: getcriticalDescription,
};
