import { Test } from "../models/Test.js";
import { TestAttempt } from "../models/TestAttempt.js";
import { Sign } from "../models/Sign.js";
import { config } from "../config/config.js";

export async function submitTestService(userId, data) {
  const newTest = await Test.create({ user: userId });

  const attempts = data.results.map(r => ({
    test: newTest._id,
    sign: r.sign_id,
    score: r.score,
    is_correct: r.is_correct,
  }));

  await TestAttempt.insertMany(attempts);

  return {
    test_id: newTest._id.toString(),
    attempt_count: attempts.length,
  };
}

export async function getAllTestsService(userId) {
  const tests = await Test.find({ user: userId })
    .sort({ created_at: -1 })
    .populate({
      path: "attempts",
      populate: { path: "sign" },
    });

  if (!tests.length) {
    return {
      average_accuracy: 0,
      average_score: 0,
      graph_data: [],
      pie_chart_data: { correct: 0, incorrect: 0 },
      history: [],
    };
  }

  let total_correct = 0;
  let total_attempts = 0;
  let total_score_sum = 0;
  let graph_data = [];
  let pie_correct = 0;
  let pie_incorrect = 0;

  const history = tests.map(test => {
    let correct_in_test = 0;
    let score_sum_in_test = 0;

    const attempts = test.attempts.map(attempt => {
      const sign = attempt.sign;
      const score = attempt.score || 0;
      const is_correct = attempt.is_correct;

      total_score_sum += score;
      score_sum_in_test += score;
      total_attempts += 1;

      if (is_correct) {
        total_correct += 1;
        correct_in_test += 1;
        pie_correct += 1;
      } else {
        pie_incorrect += 1;
      }

      return {
        test_attempt_id: attempt._id.toString(),
        sign_id: sign._id.toString(),
        score,
        is_correct,
        sign: {
          name: sign.name,
          description: sign.description,
          meaning: sign.meaning,
          usage: sign.usage,
          instruction: sign.instruction,
          image_path: sign.image_path ? `${config.baseURL}/images/${sign.image_path}` : null,
        },
      };
    });

    const accuracy = attempts.length > 0 ? (correct_in_test / attempts.length) * 100 : 0;
    const avg_score = attempts.length > 0 ? score_sum_in_test / attempts.length : 0;

    graph_data.push({
      test_id: test._id.toString(),
      date: test.created_at,
      accuracy: Number(accuracy.toFixed(2)),
      average_score: Number(avg_score.toFixed(2)),
    });

    return {
      test_id: test._id.toString(),
      user_id: test.user.toString(),
      created_at: test.created_at,
      attempts,
    };
  });

  const average_accuracy = total_attempts > 0 ? (total_correct / total_attempts) * 100 : 0;
  const average_score = total_attempts > 0 ? total_score_sum / total_attempts : 0;

  return {
    average_accuracy: Number(average_accuracy.toFixed(2)),
    average_score: Number(average_score.toFixed(2)),
    graph_data,
    pie_chart_data: {
      correct: pie_correct,
      incorrect: pie_incorrect,
    },
    history,
  };
}
