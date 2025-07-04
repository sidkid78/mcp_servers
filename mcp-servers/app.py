from flask import Flask, jsonify, request, render_template
import sqlite3

app = Flask(__name__)
DATABASE = 'database.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with app.app_context():
        db = get_db()
        with open('schema.sql', 'r') as f:
            db.executescript(f.read())
        db.commit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/todos', methods=['GET', 'POST'])
def todos():
    if request.method == 'GET':
        db = get_db()
        todos = db.execute('SELECT * FROM todos').fetchall()
        return jsonify([dict(todo) for todo in todos])
    elif request.method == 'POST':
        data = request.get_json()
        title = data.get('title')
        if not title:
            return jsonify({'error': 'Title is required'}), 400
        db = get_db()
        cursor = db.execute('INSERT INTO todos (title, completed) VALUES (?, ?)', (title, False))
        db.commit()
        return jsonify({'id': cursor.lastrowid, 'title': title, 'completed': False}), 201

@app.route('/todos/<int:todo_id>', methods=['PUT', 'DELETE'])
def todo(todo_id):
    db = get_db()
    if request.method == 'PUT':
        data = request.get_json()
        title = data.get('title')
        completed = data.get('completed')

        if title is None and completed is None:
            return jsonify({'error': 'No data provided for update'}), 400

        updates = []
        params = []
        if title is not None:
            updates.append('title = ?')
            params.append(title)
        if completed is not None:
            updates.append('completed = ?')
            params.append(completed)
        
        if not updates:
            return jsonify({'error': 'No valid fields to update'}), 400

        params.append(todo_id)
        
        cursor = db.execute(f'UPDATE todos SET {", ".join(updates)} WHERE id = ?', tuple(params))
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({'error': 'Todo not found'}), 404
        
        updated_todo = db.execute('SELECT * FROM todos WHERE id = ?', (todo_id,)).fetchone()
        return jsonify(dict(updated_todo))

    elif request.method == 'DELETE':
        cursor = db.execute('DELETE FROM todos WHERE id = ?', (todo_id,))
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({'error': 'Todo not found'}), 404
        return jsonify({'message': 'Todo deleted'}), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
