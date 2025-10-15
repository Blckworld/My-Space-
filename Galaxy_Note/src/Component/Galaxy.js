import { useEffect, useRef, useState } from "react";
import { Box, Dialog, DialogTitle, DialogContent, TextField, Button, Stack } from "@mui/material";
import axios from "axios";

const Galaxy = () => {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStar, setSelectedStar] = useState(null);
  const [content, setContent] = useState("");
  const meteors = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const generatedStars = [];
    for (let i = 0; i < 950; i++) {
      generatedStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        color: `rgba(255, 255, 255, ${Math.random()})`,
        speed: Math.random() * 0.05 + 0.01,
        angle: Math.random() * 360,
      });
    }

    setStars(generatedStars);

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      generatedStars.forEach((star) => {
        star.angle += star.speed;
        const xAxis = Math.cos(star.angle) * 2;
        const yAxis = Math.sin(star.angle) * 2;
        ctx.beginPath();
        ctx.arc(star.x + xAxis, star.y + yAxis, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });
    };

    const createMeteor = () => {
      meteors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 5 + 2,
        angle: Math.PI / 4,
      });
    };

    const drawMeteors = () => {
      meteors.forEach((meteor, index) => {
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(
          meteor.x - meteor.length * Math.cos(meteor.angle),
          meteor.y - meteor.length * Math.sin(meteor.angle)
        );
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();

        if (meteor.x > canvas.width || meteor.y > canvas.height) {
          meteors.splice(index, 1);
        }
      });
    };

    // Meteor animation
    const meteorInterval = setInterval(createMeteor, 500);
    setTimeout(() => clearInterval(meteorInterval), 10000);

    const animate = () => {
      drawStars();
      drawMeteors();
      requestAnimationFrame(animate);
    };
    animate();

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const clickedStar = generatedStars.find(
        (star) => Math.hypot(star.x - mouseX, star.y - mouseY) < star.radius + 5
      );
      if (clickedStar) {
        setSelectedStar(clickedStar);
        setContent("");
        setOpen(true);
      }
    };

    canvas.addEventListener("click", handleCanvasClick);
    return () => canvas.removeEventListener("click", handleCanvasClick);
  }, []);

  // Save note
  const handleSaveNote = async () => {
    if (!content) {
      alert("Please enter content for the note.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/save-note", {
        content: content,
      }, {
        headers: { "Content-Type": "application/json" }
      });
      if (response.status === 200) {
        alert("Your message has been saved. A loving memory to cherish forever.");
        setContent("");
        setOpen(false);
      } else {
        alert("Failed to save note.");
      }
    } catch (error) {
      alert("Failed to save note.");
    }
  };

  return (
    <>
    <Stack sx={{
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'fixed',
      top: 0, left: 0, right: 0, backgroundColor: "black"
    }}>
      <Box sx={{
        position: "relative",
        width: '100%', height: '100%',
        overflow: "hidden", backgroundColor: "black",
      }}>
        <canvas ref={canvasRef} style={{ display: "block" }}></canvas>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Star Notepad</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveNote}
            sx={{ mt: 2 }}
          >
            Save Note
          </Button>
        </DialogContent>
      </Dialog>
    </Stack>
    </>
  );
};

export default Galaxy;
