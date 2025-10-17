import React, { useEffect, useState } from 'react';

interface Member {
  username: string;
  name: string;
}

const usernames = [
  'JonatanFD',
  'zGIKS',
  'fabriziocpa',
  'Neilcuri7',
  'PaleToFo',
  'RominaMaita'
];

export const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const fetchedMembers = await Promise.all(
        usernames.map(async (username) => {
          try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            return {
              username,
              name: data.name || username
            };
          } catch (error) {
            return {
              username,
              name: username
            };
          }
        })
      );
      setMembers(fetchedMembers);
    };

    fetchMembers();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2">
      {members.map((member) => (
        <div key={member.username} className="text-center p-2 rounded-lg">
          <img
            src={`https://github.com/${member.username}.png`}
            alt={`${member.name} avatar`}
            className="w-12 h-12 rounded-full mx-auto mb-1"
          />
          <h4 className="text-xs font-semibold text-white">{member.name}</h4>
          <a
            href={`https://github.com/${member.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-300 hover:text-white transition-colors"
          >
            @{member.username}
          </a>
        </div>
      ))}
    </div>
  );
};