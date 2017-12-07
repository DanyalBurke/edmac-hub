import 'whatwg-fetch';

class MessagesStore {
    subscribers = [];

    getMessages() {
        return fetch('/api/messages.php5', {
            method: 'get'
        }).then((response) =>
            response.json()
        ).catch((err) =>
            console.log(err)
        );
    }

    addMessage(name, message) {
        fetch('/api/messages.php5', {
            method: 'POST',
            body: JSON.stringify({name: name, message: message})
        }).then((response) =>
            response.text()
        ).then((response) => {
            console.log(response);
            this.subscribers.forEach((s) => s());
        }).catch((err) =>
            console.log(err)
        );
    }

    subscribe(f) {
        this.subscribers.push(f);
    }
}

export default MessagesStore