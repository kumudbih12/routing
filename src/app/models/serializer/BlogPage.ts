import { serialize, serializeAs } from 'cerialize';
import { view } from 'app/actions/BlogPage';
import { string } from 'prop-types';

class Blog {
    @serializeAs('Name') private name: string;
    @serialize blogType: string;

    constructor(name: string, blogType: string) {
        this.name = name;
        this.blogType = blogType;
    }

    private static OnSerialized(instance: Blog, json: any): void {
        json['addiction'] = 'laser pointers';
    }
}

class Question {
    @serialize question: string;
    @serialize skills: Array<string>;
    private desrivedSkills;

    constructor(question: string = '', skills: Array<string> = []) {
        this.question = question;
        this.skills = skills;
    }

    private static OnSerialized(instance: Question, json: any): void {
        json.desrivedSkills = instance.skills[0] || 'some default skill';
    }
}

class View {
    @serialize numberOfViews: number;

    constructor(numberOfViews: number = 0) {
        this.numberOfViews = numberOfViews
    }
}

class Answer {
    @serialize answer: string;

    constructor(answer: string = '') {
        this.answer = answer;
    }
}


class BlogPage {
    @serialize private questions: string;

    @serializeAs("answer") private answers: string;

    @serializeAs('view') private view: number;

    @serializeAs(Blog, 'favorite_blog') private blog: Blog;


    private firstName: string;
    constructor(questions: string, answers: string, view: number, blog: Blog) {
        this.questions = questions;
        this.answers = answers;
        this.view = view;
        this.blog = blog;
    }

}