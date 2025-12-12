import { Box, Typography, Button, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useThemeContext } from "../ContextShareAPI/ThemeContext"; 
export default function HomePage() {

  const { mode } = useThemeContext(); 
  const bgColor = mode === "light" ? "#f5f5f5" : "#121212";
  const textColor = mode === "light" ? "#000" : "#fff";

  return (
    <Box sx={{ width: "100%", backgroundColor: bgColor, color: textColor, minHeight: "100vh" }}>
      <Navbar />

      <Box
        sx={{
          width: "100%",
          height: { xs: "350px", md: "550px" },
          position: "relative",
          borderRadius: "0 0 40px 40px",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/home.jpeg"
          alt="Hero"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <Typography
          sx={{
            position: "absolute",
            bottom: 40,
            left: 30,
            fontSize: { xs: "28px", md: "48px" },
            fontWeight: "bold",
          }}
        >
          Kalotsavam 2025
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            bottom: 15,
            left: 30,
            fontSize: { xs: "16px", md: "22px" },
            opacity: 0.8,
          }}
        >
          Celebrate Culture • Art • Rhythm
        </Typography>
      </Box>

      <Box sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
        <Grid container spacing={4}>
          {[
            {
              title: "Experience Culture",
              desc: "Dive into classical dance, folk arts, music & drama.",
              link: "/events",
              gradient: "linear-gradient(180deg, #5a3e2b, #3b261a)"
            },
            {
              title: "Join & Compete",
              desc: "Be a part of Kerala's biggest cultural event!",
              link: "/register",
              gradient: "linear-gradient(180deg, #8b5e3c, #6b4428)"
            },
            {
              title: "View Results",
              desc: "Check live scores & event updates instantly.",
              link: "/results",
              gradient: "linear-gradient(180deg, #7a3f2c, #552618)"
            }
          ].map((card, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box
                sx={{
                  background: card.gradient,
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  boxShadow: `0 0 25px ${card.gradient.replace("linear-gradient(180deg,", "").replace(")", "")}40`,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  {card.title}
                </Typography>
                <Typography sx={{ opacity: 0.8, mb: 3 }}>{card.desc}</Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "#222" }, color: "white" }}
                  component={Link}
                  to={card.link}
                >
                  {card.title.includes("View") ? "View Results" : "Explore"}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
        >
          Festival Highlights
        </Typography>

        <Grid container spacing={2}>
          {[
            "https://www.robinage.com/wp-content/uploads/2022/09/Kathakali.jpg",
            "https://daijiworld.ap-south-1.linodeobjects.com/iWeb/tvdaijiworld/images6/allwyn_170118_kalolsavam2.jpg",
            "https://i.ytimg.com/vi/8Hn8Z68JsvA/maxresdefault.jpg",
            "https://img.onmanorama.com/content/dam/mm/en/news/kerala/images/2018/9/11/kalolsavam.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/0/03/Bharathanaatyam_at_Kerala_school_kalolsavam_3.jpg",
            "https://th-i.thgim.com/public/incoming/4rltbn/article67708996.ece/alternates/LANDSCAPE_1200/10018_4_1_2024_20_31_50_1_1.JPG"
          ].map((img, i) => (
            <Grid item xs={12} md={3} key={i}>
              <img
                src={img}
                alt="Festival"
                style={{
                  width: "100%",
                  height: "220px",
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
<Box
  sx={{
    backgroundColor: mode === "light" ? "#f5f5f5" : "#000", 
    color: mode === "light" ? "#000" : "#fff",
    py: 4,
    textAlign: "center",
    mt: 4,
    borderTop: mode === "light" ? "2px solid black" : "2px solid #333", 
  }}
>
  <Typography variant="body2">
    © 2025 Kalotsavam. All Rights Reserved.
  </Typography>
</Box>


    </Box>
  );
}
