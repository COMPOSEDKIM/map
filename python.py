from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def quiz():
    question_number = request.args.get('question_number', '1')
    return render_template('quiz.html', question_number=question_number)




@app.route('/answer', methods=['POST'])
def answer():
    question_number = request.form.get('question_number')
    answer = request.form.get('answer')
    session[question_number] = answer
    next_question_number = str(int(question_number) + 1)

    # 사용자가 모든 질문에 답한 후에만 추천 페이지로 이동
    if next_question_number == '6':
        if all(session.get(str(i), False) for i in range(1, 6)):
            return redirect(url_for('recommend'))
        else:
            return render_template('error.html', message="모든 질문에 답해주세요.")
    else:
        return redirect(url_for('quiz', question_number=next_question_number))


@app.route('/recommend')
def recommend():
    answers = [session.get(str(i), '0') for i in range(1, 6)]
    recommendations = {
        "11111": "파리를 추천합니다!",
        "11112": "바르셀로나를 추천합니다!",
        "11121": "로마를 추천합니다!",
        "11122": "암스테르담을 추천합니다!",
        "11211": "리스본을 추천합니다!",
        "11212": "베를린을 추천합니다!",
        "11221": "프라하를 추천합니다!",
        "11222": "뮌헨을 추천합니다!",
        "12111": "더블린을 추천합니다!",
        "12112": "브뤼셀을 추천합니다!",
        "12121": "비엔나를 추천합니다!",
        "12122": "코펜하겐을 추천합니다!",
        "12211": "오스로를 추천합니다!",
        "12212": "스톡홀름을 추천합니다!",
        "12221": "헬싱키를 추천합니다!",
        "12222": "레이캬비크를 추천합니다!",
        "21111": "시드니를 추천합니다!",
        "21112": "멜버른을 추천합니다!",
        "21121": "브리즈번을 추천합니다!",
        "21122": "퍼스를 추천합니다!",
        "21211": "아들레이드를 추천합니다!",
        "21212": "캔버라를 추천합니다!",
        "21221": "호바트를 추천합니다!",
        "21222": "다윈을 추천합니다!",
        "22111": "오클랜드를 추천합니다!",
        "22112": "웰링턴을 추천합니다!",
        "22121": "크라이스트처치를 추천합니다!",
        "22122": "퀸스타운을 추천합니다!",
        "22211": "던에딘을 추천합니다!",
        "22212": "포티드를 추천합니다!",
        "22221": "테카포를 추천합니다!",
        "22222": "뉴질랜드의 피오르드랜드를 추천합니다!",
    }
    answer_key = "".join(answers)
    recommendation = recommendations.get(answer_key, "죄송합니다. 적절한 여행지를 찾지 못했습니다.")
    return render_template('recommend.html', recommendation=recommendation)

if __name__ == '__main__':
    app.run(debug=True)

