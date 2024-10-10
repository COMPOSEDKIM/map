// 채팅 메시지를 표시할 DOM
const chatMessages = document.querySelector("#chat-messages");
// 사용자 입력 필드
const userInput = document.querySelector("#user-input input");
// 전송 버튼
const sendButton = document.querySelector("#user-input button");
// 발급받은 OpenAI API 키를 변수로 저장
const apiKey = "비공개";
// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = "https://api.openai.com/v1/chat/completions";
let count = 0;
function addMessage(sender, message) {
  // 새로운 div 생성
  const messageElement = document.createElement("div");
  // 생성된 요소에 클래스 추가
  messageElement.className = "message";
  // 채팅 메시지 목록에 새로운 메시지 추가
  messageElement.innerText = `${sender}: ${message}`;
  chatMessages.prepend(messageElement);

  if (count % 2 == 0) {
    messageElement.style.textAlign = "left";
  } else {
    messageElement.style.textAlign = "right";
  }
  count = count + 1;
}
// ChatGPT API 요청
async function fetchAIResponse(prompt) {
  // API 요청에 사용할 옵션을 정의
  const requestOptions = {
    method: "POST",
    // API 요청의 헤더를 설정
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4", // 사용할 AI 모델
      messages: [
        {
          role: "system",
          content:
            "너에게 국가 이름과 여행 일수를 알려주면 여행 일정을 작성해줘. 여행 일정은 Day1, Day2 이렇게 나눠주고 아침, 오전, 오후, 저녁 이런식으로 표현해줘. 일정을 작성해 줄 때 장소를 정확하게 알려줘. 마지막 날에는 귀국하는 일정이 있었으면 좋겠어. 여행 일수를 넘기지 말아줘.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8, // 모델의 출력 다양성
      max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
      top_p: 1, // 토큰 샘플링 확률을 설정
      frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
      presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
      stop: ["Human"], // 생성된 텍스트에서 종료 구문을 설정
    }),
  };
  // API 요청후 응답 처리
  try {
    const response = await fetch(apiEndpoint, requestOptions);
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    return aiResponse;
  } catch (error) {
    console.error("OpenAI API 호출 중 오류 발생:", error);
    return "OpenAI API 호출 중 오류 발생";
  }
}
addMessage("챗봇", "여행 갈 지역과 일수를 적어주세요\n      ex) 일본 2박 3일");
// 전송 버튼 클릭 이벤트 처리
sendButton.addEventListener("click", async () => {
  // 사용자가 입력한 메시지
  const message = userInput.value.trim();
  // 메시지가 비어있으면 리턴
  if (message.length === 0) return;
  // 사용자 메시지 화면에 추가
  addMessage("나", message);
  userInput.value = "";
  //ChatGPT API 요청후 답변을 화면에 추가
  const aiResponse = await fetchAIResponse(message);
  console.log(aiResponse);

  addMessage("챗봇", aiResponse);
});
// 사용자 입력 필드에서 Enter 키 이벤트를 처리
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});
