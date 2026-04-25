let counter = 0;

setInterval(() => {
  counter += 1;
  console.log(
    JSON.stringify({
      service: "worker",
      status: "running",
      heartbeat: counter,
      timestamp: new Date().toISOString()
    })
  );
}, 5000);