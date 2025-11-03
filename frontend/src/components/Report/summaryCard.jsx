import React, { useMemo } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { Assessment, EmojiEvents, CheckCircle } from "@mui/icons-material";

const SummaryCards = ({ report }) => {
  const totalTests = report?.history?.length || 0;
  const averageScore = report?.average_score || 0;
  const average_accuracy = report?.average_accuracy || 0;

  const totalCorrect = useMemo(() => {
    return report?.date?.reduce(
      (acc, test) => acc + test?.attempts?.filter((a) => a?.is_correct)?.length,
      0
    );
  }, [report]);

  const cards = [
    {
      title: "Total Tests",
      value: totalTests,
      icon: <Assessment />,
      bg: "linear-gradient(135deg, #bbdefb, #90caf9)",
      color: "#0d47a1",
    },
    {
      title: "Average Score",
      value: `${averageScore}%`,
      icon: <EmojiEvents />,
      bg: "linear-gradient(135deg, #ffe082, #ffca28)",
      color: "#795548",
    },
    {
      title: "Average Accuracy",
      value: average_accuracy,
      icon: <CheckCircle />,
      bg: "linear-gradient(135deg, #a5d6a7, #66bb6a)",
      color: "#1b5e20",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, i) => (
        <Grid key={i} item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              minWidth: "300px",
              background: card.bg,
              color: card.color,
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                {card.icon}
                <Typography variant="subtitle2">{card.title}</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
