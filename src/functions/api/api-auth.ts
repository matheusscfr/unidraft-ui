export const API_URL = "http://localhost:3000/";

export function AUTH_DASH() { 
    return {
      url: API_URL + "users/login",
  };
}

export function USER_ID(userid: string | undefined) {
    return {
        url: API_URL + "users/" + userid,
    }
}

export function  GET_ALL_QUESTIONS(userid: string | undefined) {
    return {
        url: API_URL + "university/unanswered/" + userid
    }
}

export function  GET_ONE_QUESTIONS(id_question: string | undefined) {
    return {
        url: API_URL + "university/question/" + id_question
    }
}

export function MARK_ANSWER(id_answer: string | undefined) {
    return {
        url: API_URL + "university/answer/" + id_answer
    }
}